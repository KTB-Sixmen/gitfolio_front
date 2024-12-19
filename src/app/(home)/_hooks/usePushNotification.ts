import { useRef, useCallback } from "react";

const usePushNotification = () => {
  const notificationRef = useRef<Notification | null>(null);

  // Notification이 지원되지 않는 브라우저가 있을 수 있기 때문에, 이를 대비한다.
  // 지원하지 않으면 fireNotification이 동작하지 않도록 한다.
  const isNotificationSupported = typeof Notification !== "undefined";

  const requestPermission = useCallback(async () => {
    if (!isNotificationSupported) return false;

    // 이미 권한이 허용된 경우
    if (Notification.permission === "granted") return true;

    // 권한 요청
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }, [isNotificationSupported]);

  const setNotificationClickEvent = useCallback((url: string) => {
    if (!notificationRef.current) return;
    notificationRef.current.onclick = (event) => {
      event.preventDefault();
      window.focus();
      // 클릭 시 해당 URL로 이동
      window.location.href = url;
      notificationRef.current?.close();
    };
  }, []);

  // title: 알림 제목, options: Notification 옵션 객체, url: 클릭 시 이동할 URL
  const fireNotification = useCallback(
    async (title: string, options: NotificationOptions = {}, url?: string) => {
      if (!isNotificationSupported) return;

      const granted = await requestPermission();
      if (!granted) return;

      const notification = new Notification(title, {
        badge: options.badge || "",
        icon: options.icon || "",
        body: options.body,
      });
      notificationRef.current = notification;

      if (url) {
        setNotificationClickEvent(url);
      }
    },
    [isNotificationSupported, requestPermission, setNotificationClickEvent],
  );

  return { fireNotification };
};

export default usePushNotification;
