const SelectorWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      {children}
      <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <i className="ri-arrow-down-s-line text-gray-500"></i>
      </span>
    </div>
  );
};

export default SelectorWrapper;
