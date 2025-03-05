import initRain from './rain.js';
// import initRainWind from './rain-wind.js';

document.addEventListener('DOMContentLoaded', () => {
    let ticking = false;

    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                document.documentElement.style.setProperty('--move-x', `${(e.clientX - window.innerWidth / 2) * -.005}deg`);
                document.documentElement.style.setProperty('--move-y', `${(e.clientY - window.innerHeight / 2) * .01}deg`);
                ticking = false;
            });
            ticking = true;
        }
    });

    // document.addEventListener('mousemove', (e) => {
    //     if (!ticking) {
    //         ticking = true;
    //         requestAnimationFrame(() => {
    //             const x = (e.clientX - window.innerWidth / 2) * -0.005;
    //             const y = (e.clientY - window.innerHeight / 2) * 0.01;

    //             document.documentElement.style.setProperty('--move-x', `${x}deg`);
    //             document.documentElement.style.setProperty('--move-y', `${y}deg`);

    //             ticking = false;
    //         });
    //     }
    // });
    
    initRain();
    // const rainController = initRainWind();
    // console.log(rainController);
});
