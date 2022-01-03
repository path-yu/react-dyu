const TIME_BOUNCE = 800;
const THRESHOLD = 70;
const STOP = 56;

export default {
  scrollY: true,
  bounceTime: TIME_BOUNCE,
  useTransition: false,
  pullDownRefresh: {
    threshold: THRESHOLD,
    stop: STOP,
  },
};
