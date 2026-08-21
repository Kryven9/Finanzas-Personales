const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-neutral-200/80 rounded-xl p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;
