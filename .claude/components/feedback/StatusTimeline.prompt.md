Vertical tracker for Booking Details and Active Trip screens. Each step is `done` (green check), `active` (blue, ringed), or `pending` (gray outline).

```jsx
<StatusTimeline steps={[
  { label:"Booking Approved", time:"8:02 AM", state:"done" },
  { label:"Driver Assigned", time:"8:10 AM", state:"done" },
  { label:"In Transit", time:"Now", state:"active" },
  { label:"Completed", state:"pending" },
]} />
```
