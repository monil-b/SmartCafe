type LoaderProps = {
  className?: string;
};

const Loader = ({ className = "h-4 w-4" }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center" aria-label="Loading">
      <span
        className={`box-border rounded-full border-2 border-current border-t-transparent animate-spin ${className}`}
      />
    </div>
  );
};

export default Loader;
