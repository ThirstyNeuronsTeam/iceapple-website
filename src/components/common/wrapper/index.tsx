// src/components/layout/Wrapper.tsx
type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Wrapper({ children, className = "" }: WrapperProps) {
  return <div className={`container ${className}`}>{children}</div>;
}
