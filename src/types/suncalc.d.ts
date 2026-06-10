declare module 'suncalc' {
  const SunCalc: {
    getMoonIllumination(date: Date): {
      fraction: number;
      phase: number;
      angle: number;
    };
    getMoonPosition(date: Date, latitude: number, longitude: number): {
      azimuth: number;
      altitude: number;
      distance: number;
      parallacticAngle: number;
    };
  };

  export default SunCalc;
}
