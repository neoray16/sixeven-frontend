// Service worker של siXeven
// מאפשר להתקין את האתר כאפליקציה במסך הבית.
// בכוונה לא שומר שום דבר במטמון: תמיד נטענת הגרסה העדכנית מהאינטרנט,
// כך שכל עדכון שמעלים לאתר מגיע לתלמידים מיד.

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // רק דפי האפליקציה עצמה; בקשות לשרת ול-API עוברות כרגיל
    if (event.request.mode !== 'navigate') return;

    event.respondWith(
        fetch(event.request).catch(() => new Response(
            '<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="UTF-8">' +
            '<meta name="viewport" content="width=device-width, initial-scale=1">' +
            '<title>siXeven</title></head>' +
            '<body style="background:#020617;color:#e2e8f0;font-family:sans-serif;' +
            'display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center">' +
            '<div><h2>אין חיבור לאינטרנט</h2><p>בדוק את החיבור ונסה שוב</p></div></body></html>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        ))
    );
});
