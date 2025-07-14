import { useState, useCallback, useEffect, useRef } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  const logoutTimer = useRef();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpiry =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1 hour
    setTokenExpirationDate(tokenExpiry);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpiry.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer.current = setTimeout(logout, remainingTime);
    } else if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
  }, [token, logout, tokenExpirationDate]);

  return { token, login, logout, userId };
};
