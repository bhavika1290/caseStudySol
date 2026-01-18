function Scale() {
  return (
    <section className="fixed bottom-0 left-0 w-full bg-white border-t z-10 px-4 py-3">
      <div className="max-w-6xl mx-auto">
        
        <p className="font-medium mb-2 text-sm md:text-base">
          Performance Ratio (PR) Color Scale
        </p>

        {/* Gradient Bar */}
        <div className="h-4 md:h-5 w-full rounded-full bg-gradient-to-r from-[rgb(240,0,0)] to-[rgb(0,240,0)]" />

        {/* Labels */}
        <div className="flex justify-between text-xs md:text-sm mt-1">
          <span>Low PR</span>
          <span>High PR</span>
        </div>
      </div>
    </section>
  );
}

export default Scale;
