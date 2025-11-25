type StatusProps = {
  children?: React.ReactNode;
  props?: any;
};

export const Success: React.FC<StatusProps> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className=" py-1 px-4 rounded-3xl bg-green-400 text-green-950"
    >
      {children}
    </span>
  );
};

export const Failed: React.FC<StatusProps> = ({ children, ...props }) => {
  return (
    <span {...props} className=" py-1 px-4 rounded-3xl bg-red-500 text-red-950">
      {children}
    </span>
  );
};
