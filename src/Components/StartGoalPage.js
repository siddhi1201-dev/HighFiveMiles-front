import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { FaRunning, FaHome, FaSignOutAlt, FaMapMarkerAlt, FaMedal, 
         FaChartLine, FaCalendarAlt, FaChartPie, FaRoute, 
         FaFlagCheckered, FaTrophy, FaFire, FaMountain, 
         FaTree, FaRoad, FaTachometerAlt, FaStar, FaHeart, FaCrown,
         FaComment, FaThumbsUp, FaTrash, FaPlus, FaEllipsisH,
         FaPlay, FaPause, FaStop, FaShare, FaHistory, FaBullseye,
         FaClock, FaRoute as FaRouteIcon, FaFireAlt, FaTrophy as FaTrophyIcon } from 'react-icons/fa';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom map component to handle location updates
function LocationMarker({ position, isTracking }) {
  const map = useMap();
  
  useEffect(() => {
    if (position && isTracking) {
      map.setView(position, 16);
    }
  }, [position, isTracking, map]);
  
  return position ? <Marker position={position} /> : null;
}

const StartGoalPage = () => {
  // State variables for the running app
  const [goalDistance, setGoalDistance] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [averagePace, setAveragePace] = useState('00:00 min/km');
  const [currentSpeed, setCurrentSpeed] = useState('0.0 km/h');
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [runPath, setRunPath] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [runHistory, setRunHistory] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentRunData, setCurrentRunData] = useState(null);
  const [currentRunId, setCurrentRunId] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);
  const watchIdRef = useRef(null);

  // Constants
  const CALORIES_PER_KM = 60;
  const POLLING_INTERVAL = 1000;

  // Load user stats and history on component mount
  useEffect(() => {
    loadUserStats();
    loadRunHistory();
  }, []);

  // Load user statistics from backend
  const loadUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Load run history from backend
  const loadRunHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/runs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRunHistory(response.data);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve([latitude, longitude]);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Start location tracking
  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser');
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPosition = [latitude, longitude];
        
        setCurrentPosition(newPosition);
        
        if (isTracking && !isPaused && runPath.length > 0) {
          const lastPosition = runPath[runPath.length - 1];
          const distanceIncrement = calculateDistance(
            lastPosition[0], lastPosition[1],
            latitude, longitude
          );
          
          setDistance(prev => prev + distanceIncrement);
          setRunPath(prev => [...prev, newPosition]);
          
          // Update backend
          updateRunProgress(distanceIncrement, newPosition);
        } else if (isTracking && !isPaused) {
          setRunPath([newPosition]);
        }
      },
      (error) => {
        console.error('Location tracking error:', error);
        setErrorMessage('Error getting location. Please check your GPS settings.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Stop location tracking
  const stopLocationTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  // Update run progress in backend
  const updateRunProgress = async (distanceIncrement, newPosition) => {
    if (!currentRunId) return;
    
    try {
      const token = localStorage.getItem('token');
      const newDistance = distance + distanceIncrement;
      const newCalories = Math.round(newDistance * CALORIES_PER_KM);
      const newTime = time + POLLING_INTERVAL / 1000;
      
      await axios.put(`/api/runs/${currentRunId}/progress`, {
        distance: newDistance,
        currentLocation: newPosition,
        duration: newTime,
        caloriesBurned: newCalories,
        currentSpeed: `${(distanceIncrement / (POLLING_INTERVAL / 3600000)).toFixed(1)} km/h`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setDistance(newDistance);
      setTime(newTime);
      setCaloriesBurned(newCalories);
    } catch (error) {
      console.error('Error updating run progress:', error);
    }
  };

  // Effect hook to manage the timer
  useEffect(() => {
    if (isTracking && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + POLLING_INTERVAL / 1000);
      }, POLLING_INTERVAL);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isTracking, isPaused]);

  // Cleanup effect for location tracking and map
  useEffect(() => {
    return () => {
      // Cleanup location tracking
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      // Cleanup timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Effect hook to update average pace
  useEffect(() => {
    if (time > 0 && distance > 0) {
      const totalMinutes = time / 60;
      const pace = totalMinutes / distance;
      const minutes = Math.floor(pace);
      const seconds = Math.round((pace - minutes) * 60);
      setAveragePace(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} min/km`);
    } else {
      setAveragePace('00:00 min/km');
    }
  }, [distance, time]);

  // Function to format time from seconds to HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handler for the Start button
  const handleStart = async () => {
    if (goalDistance === '' || parseFloat(goalDistance) <= 0 || isNaN(parseFloat(goalDistance))) {
      setErrorMessage('Please set a valid distance goal (e.g., 5.0 km) before starting.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const startLocation = await getCurrentLocation();
      const token = localStorage.getItem('token');
      
      const response = await axios.post('/api/runs/start', {
        goalDistance: parseFloat(goalDistance),
        startLocation
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCurrentRunId(response.data.id);
      setCurrentPosition(startLocation);
      setRunPath([startLocation]);
      setIsTracking(true);
      setIsPaused(false);
      setDistance(0);
      setTime(0);
      setCaloriesBurned(0);
      setCurrentSpeed('0.0 km/h');
      
      startLocationTracking();
    } catch (error) {
      console.error('Error starting run:', error);
      setErrorMessage('Error starting run. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handler for the Pause button
  const handlePause = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/runs/${currentRunId}/pause`, {
        isPaused: true
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setIsPaused(true);
    } catch (error) {
      console.error('Error pausing run:', error);
    }
  };

  // Handler for the Stop button
  const handleStop = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/runs/${currentRunId}/end`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const runData = {
        id: currentRunId,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        distance: distance,
        duration: time,
        averagePace: averagePace,
        caloriesBurned: Math.round(caloriesBurned),
        goalDistance: parseFloat(goalDistance),
        goalAchieved: distance >= parseFloat(goalDistance)
      };
      
      setCurrentRunData(runData);
      setRunHistory(prev => [runData, ...prev]);
      
      // Reload stats
      loadUserStats();
    } catch (error) {
      console.error('Error ending run:', error);
    } finally {
      setIsTracking(false);
      setIsPaused(false);
      setCurrentSpeed('0.0 km/h');
      setCurrentRunId(null);
      stopLocationTracking();
    }
  };

  // Handler for sharing run data
  const handleShare = () => {
    setShowShareModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 text-indigo-900 p-4 md:p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-br from-purple-200/30 to-violet-100/20 rounded-b-full -translate-y-1/3 -translate-x-1/3"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-300/20 rounded-full translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative">
              <FaRunning className="text-4xl text-purple-700 mr-3 z-10 relative" />
              <div className="absolute top-1 -left-1 w-10 h-10 bg-purple-300 rounded-full -z-10"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">RUNNING APP</h1>
          </div>
          <div className="flex space-x-3">
            <Link to="/profile" className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-5 py-2 rounded-full font-medium flex items-center transition-all duration-300 shadow-lg hover:shadow-xl">
              <FaHome className="mr-2" /> Profile
            </Link>
            <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white px-5 py-2 rounded-full font-medium flex items-center transition-all duration-300 shadow-lg hover:shadow-xl">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Running App */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white relative overflow-hidden">
              {/* App Header */}
              <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white flex items-center justify-between rounded-t-3xl mb-6">
                <h2 className="text-2xl font-bold">K Running</h2>
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://placehold.co/32x32/FF69B4/FFFFFF?text=P" alt="Profile" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://placehold.co/32x32/87CEEB/FFFFFF?text=J" alt="Profile" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://placehold.co/32x32/90EE90/FFFFFF?text=S" alt="Profile" />
                </div>
              </div>

              {/* User Info */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-xl font-semibold text-gray-800">K.Park</span>
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">premium</span>
                </div>
                <p className="text-gray-600">Say HI, 3 runners near you!</p>
              </div>

              {/* Goal Setting Section */}
              <div className="mb-6">
                <label htmlFor="goalDistance" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaBullseye className="mr-2 text-purple-500" />
                  Set Your Distance Goal (km):
                </label>
                <input
                  type="number"
                  id="goalDistance"
                  value={goalDistance}
                  onChange={(e) => setGoalDistance(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="e.g., 5.0"
                  min="0.1"
                  step="0.1"
                  disabled={isTracking}
                />
                {errorMessage && (
                  <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
              </div>

              {/* Metrics Display */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
                  <span className="text-gray-500 text-sm flex items-center justify-center mb-1">
                    <FaRouteIcon className="mr-1 text-blue-500" />
                    Distance
                  </span>
                  <span className="text-3xl font-bold text-gray-900">{distance.toFixed(2)} <span className="text-xl font-normal text-gray-600">km</span></span>
                </div>
                <div className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
                  <span className="text-gray-500 text-sm flex items-center justify-center mb-1">
                    <FaClock className="mr-1 text-purple-500" />
                    Time
                  </span>
                  <span className="text-3xl font-bold text-gray-900">{formatTime(time)}</span>
                </div>
                <div className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
                  <span className="text-gray-500 text-sm flex items-center justify-center mb-1">
                    <FaFireAlt className="mr-1 text-red-500" />
                    Calories
                  </span>
                  <span className="text-3xl font-bold text-gray-900">{Math.round(caloriesBurned)} <span className="text-xl font-normal text-gray-600">kcal</span></span>
                </div>
                <div className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
                  <span className="text-gray-500 text-sm flex items-center justify-center mb-1">
                    <FaTachometerAlt className="mr-1 text-green-500" />
                    Pace
                  </span>
                  <span className="text-3xl font-bold text-gray-900">{averagePace}</span>
                </div>
                <div className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100 col-span-2">
                  <span className="text-gray-500 text-sm flex items-center justify-center mb-1">
                    <FaTachometerAlt className="mr-1 text-orange-500" />
                    Current Speed
                  </span>
                  <span className="text-3xl font-bold text-gray-900">{currentSpeed}</span>
                </div>
              </div>

              {/* Real Map Section */}
              <div className="relative bg-gray-200 h-64 lg:h-96 flex items-center justify-center rounded-xl overflow-hidden mb-6">
                {currentPosition ? (
                  <MapContainer
                    key={`map-${currentPosition[0]}-${currentPosition[1]}`}
                    center={currentPosition}
                    zoom={16}
                    style={{ height: '100%', width: '100%' }}
                    className="rounded-xl"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker position={currentPosition} isTracking={isTracking} />
                    {runPath.length > 1 && (
                      <Polyline
                        positions={runPath}
                        color="red"
                        weight={3}
                        opacity={0.8}
                      />
                    )}
                    {runPath.length > 0 && (
                      <Marker
                        position={runPath[0]}
                        icon={L.divIcon({
                          className: 'custom-div-icon',
                          html: '<div style="background-color: green; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
                          iconSize: [12, 12],
                          iconAnchor: [6, 6]
                        })}
                      />
                    )}
                  </MapContainer>
                ) : (
                  <div className="text-center text-gray-500">
                    <FaMapMarkerAlt className="text-4xl mx-auto mb-2" />
                    <p>Getting your location...</p>
                  </div>
                )}
              </div>

              {/* Control Buttons */}
              <div className="flex justify-around space-x-4 mb-6">
                {!isTracking && (
                  <button
                    onClick={handleStart}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center disabled:opacity-50"
                  >
                    {loading ? 'Starting...' : (
                      <>
                        <FaPlay className="mr-2" /> Start
                      </>
                    )}
                  </button>
                )}

                {isTracking && !isPaused && (
                  <>
                    <button
                      onClick={handleStop}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                    >
                      <FaStop className="mr-2" /> Stop
                    </button>
                    <button
                      onClick={handlePause}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                    >
                      <FaPause className="mr-2" /> Pause
                    </button>
                  </>
                )}

                {isTracking && isPaused && (
                  <>
                    <button
                      onClick={handleStop}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                    >
                      <FaStop className="mr-2" /> Stop
                    </button>
                    <button
                      onClick={() => setIsPaused(false)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                    >
                      <FaPlay className="mr-2" /> Resume
                    </button>
                  </>
                )}
              </div>

              {/* Completion Summary */}
              {!isTracking && distance > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 rounded-xl p-6 text-center border border-blue-200">
                  <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
                    <FaTrophyIcon className="mr-2 text-yellow-500" />
                    Run Completed!
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-lg">Total Distance: <span className="font-semibold">{distance.toFixed(2)} km</span></p>
                      <p className="text-lg">Total Time: <span className="font-semibold">{formatTime(time)}</span></p>
                    </div>
                    <div>
                      <p className="text-lg">Average Pace: <span className="font-semibold">{averagePace}</span></p>
                      <p className="text-lg">Calories Burned: <span className="font-semibold">{Math.round(caloriesBurned)} kcal</span></p>
                    </div>
                  </div>
                  {distance >= parseFloat(goalDistance) && (
                    <p className="text-green-600 font-bold text-lg mb-4">🎉 Congratulations! You met your goal of {parseFloat(goalDistance).toFixed(1)} km!</p>
                  )}
                  {distance < parseFloat(goalDistance) && (
                    <p className="text-orange-600 font-bold text-lg mb-4">You ran {(parseFloat(goalDistance) - distance).toFixed(2)} km short of your goal.</p>
                  )}
                  <button
                    onClick={handleShare}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto"
                  >
                    <FaShare className="mr-2" /> Share Run
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Stats & History */}
          <div className="lg:col-span-1 space-y-6">
            {/* Overall Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white">
              <h3 className="flex items-center font-bold text-lg mb-4 text-purple-800">
                <FaChartLine className="text-indigo-500 mr-2" /> Overall Stats
              </h3>
              <div className="space-y-4">
                <div className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
                  <p className="text-2xl font-bold text-indigo-700">{userStats?.totalRuns || 0}</p>
                  <p className="text-purple-600 text-sm">Total Runs</p>
                </div>
                <div className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
                  <p className="text-2xl font-bold text-indigo-700">{(userStats?.totalDistance || 0).toFixed(1)} km</p>
                  <p className="text-purple-600 text-sm">Total Distance</p>
                </div>
                <div className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
                  <p className="text-2xl font-bold text-indigo-700">{formatTime(userStats?.totalTime || 0)}</p>
                  <p className="text-purple-600 text-sm">Total Time</p>
                </div>
                <div className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
                  <p className="text-2xl font-bold text-indigo-700">{userStats?.totalCalories || 0}</p>
                  <p className="text-purple-600 text-sm">Total Calories</p>
                </div>
                <div className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
                  <p className="text-2xl font-bold text-indigo-700">{userStats?.goalsAchieved || 0}/{userStats?.totalRuns || 0}</p>
                  <p className="text-purple-600 text-sm">Goals Achieved</p>
                </div>
              </div>
            </div>

            {/* Run History */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="flex items-center font-bold text-lg text-purple-800">
                  <FaHistory className="text-indigo-500 mr-2" /> Run History
                </h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                >
                  {showHistory ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showHistory && (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {runHistory.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No runs completed yet. Start your first run!</p>
                  ) : (
                    runHistory.map((run) => (
                      <div key={run.id} className="bg-purple-50/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-indigo-800">{run.date} {run.time}</p>
                            <p className="text-sm text-purple-600">Goal: {run.goalDistance} km</p>
                          </div>
                          {run.goalAchieved && (
                            <FaTrophyIcon className="text-yellow-500 text-lg" />
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">Distance: <span className="font-semibold">{run.distance.toFixed(2)} km</span></p>
                            <p className="text-gray-600">Time: <span className="font-semibold">{formatTime(run.duration)}</span></p>
                          </div>
                          <div>
                            <p className="text-gray-600">Pace: <span className="font-semibold">{run.averagePace}</span></p>
                            <p className="text-gray-600">Calories: <span className="font-semibold">{run.caloriesBurned}</span></p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && currentRunData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4 text-center">Share Your Run!</h3>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-4">
                <p className="text-center font-semibold text-lg mb-2">🏃‍♂️ Amazing Run!</p>
                <div className="space-y-2 text-sm">
                  <p>Distance: <span className="font-semibold">{currentRunData.distance.toFixed(2)} km</span></p>
                  <p>Time: <span className="font-semibold">{formatTime(currentRunData.duration)}</span></p>
                  <p>Pace: <span className="font-semibold">{currentRunData.averagePace}</span></p>
                  <p>Calories: <span className="font-semibold">{currentRunData.caloriesBurned} kcal</span></p>
                  {currentRunData.goalAchieved && (
                    <p className="text-green-600 font-semibold">🎉 Goal Achieved!</p>
                  )}
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    navigator.share && navigator.share({
                      title: 'My Running Achievement',
                      text: `I just ran ${currentRunData.distance.toFixed(2)} km in ${formatTime(currentRunData.duration)}! 🏃‍♂️`,
                      url: window.location.href
                    }).catch(() => {
                      navigator.clipboard.writeText(`I just ran ${currentRunData.distance.toFixed(2)} km in ${formatTime(currentRunData.duration)}! 🏃‍♂️`);
                      alert('Run details copied to clipboard!');
                    });
                    setShowShareModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-300"
                >
                  Share
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-full font-medium transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartGoalPage; 