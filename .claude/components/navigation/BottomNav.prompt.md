Fixed bottom tab bar for the passenger & driver apps. Keep to 4-5 tabs; active tab turns brand blue. Supports a count `badge` (e.g. unread notifications).

```jsx
<BottomNav activeKey="home" onChange={setTab} items={[
  { key:"home", label:"Home", icon:<Icon name="home"/> },
  { key:"bookings", label:"Bookings", icon:<Icon name="ticket"/>, badge:2 },
  { key:"profile", label:"Profile", icon:<Icon name="user"/> },
]} />
```
