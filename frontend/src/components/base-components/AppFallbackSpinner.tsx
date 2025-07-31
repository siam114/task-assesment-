
const AppFallbackSpinner = ({ logoSrc }: { logoSrc?: string }) => {
  return (
    <div className="flex z-999 flex-col justify-center items-center min-h-screen">
      <div className="loadingspinner">
        <div id="square1"></div>
        <div id="square2"></div>
        <div id="square3"></div>
        <div id="square4"></div>
        <div id="square5"></div>
      </div>
    </div>
  );
};

export default AppFallbackSpinner;
