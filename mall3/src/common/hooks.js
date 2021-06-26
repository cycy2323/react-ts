import { useEffect } from 'react';
import SocketClient from 'socket.io-client';
import { usePersistFn } from 'ahooks';
import useSafeState from 'ahooks/lib/useSafeState';
import { empty } from './utils';

/**
 * websocket推送
 * @param _path 路径
 * @param msgCallback 消息回调
 * @return socket.io-client实例
 */
export const useWebsocketPush = (_path = '/', msgCallback = empty) => {
  const [instance, setInstance] = useSafeState();

  const listenObj = typeof msgCallback === 'function' ? { message: msgCallback } : msgCallback;
  const msgCallbackHandle = usePersistFn((handle, data, socket) => {
    if (typeof handle === 'function') handle(data, socket);
  });

  useEffect(() => {
    const socketInstance = SocketClient(
      `${process.env.WEBSOCKET_PUSH_API}${_path}`,
      { transports: ['websocket', 'xhr-polling', 'jsonp-polling'] }
    );

    Object.keys(listenObj).forEach((name) => {
      socketInstance.on(name, (str) => {
        let result;
        try {
          result = JSON.parse(str);
        } catch (e) {
          result = str;
        }
        msgCallbackHandle(listenObj[name], result, socketInstance);
      });
    });

    setInstance(socketInstance);

    return () => {
      if (socketInstance) socketInstance.disconnect();
    };
  }, []);

  return instance;
};
