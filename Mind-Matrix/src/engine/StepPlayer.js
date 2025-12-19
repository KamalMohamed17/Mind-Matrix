let timer = null;

export function playSteps(steps, setStep, indexRef, speed = 800) {
  if (timer) return;

  timer = setInterval(() => {
    if (indexRef.current >= steps.length) {
      clearInterval(timer);
      timer = null;
      return;
    }
    setStep(steps[indexRef.current]);
    indexRef.current++;
  }, speed);
}

export function pauseSteps() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

export function nextStep(steps, setStep, indexRef) {
  if (indexRef.current < steps.length) {
    setStep(steps[indexRef.current]);
    indexRef.current++;
  }
}
