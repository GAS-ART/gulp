function f(x) {
   console.log(`Doing: ${x}`);
}

function calls(func, ms) {
   let call = true,
      currentCall,
      lastCall;
   return function () {
      if (call) {
         call = false;
         clearInterval(lastCall);
         currentCall = setTimeout(() => { call = true }, ms);
         return func.apply(this, arguments);
      } else {
         clearInterval(currentCall);
         currentCall = setTimeout(() => { call = true }, ms);
      }
      clearInterval(lastCall);
      lastCall = setTimeout(() => {
         call = false;
         return func.apply(this, arguments);
      }, ms);
   }
}

// создаём обёртку
f = calls(f, 1000);

f(1);
f(2);
setTimeout(() => f(3), 100);
setTimeout(() => f(3.1), 200);
setTimeout(() => f(3.2), 300);
setTimeout(() => f(4), 1100);
setTimeout(() => f(5), 2000);
setTimeout(() => f(6), 2900);
setTimeout(() => f(7), 3800);
setTimeout(() => f(8), 4500);