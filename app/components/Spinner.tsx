import "./Spinner.css";

export default function Spinner({ className }: { className?: string }) {
  return <div className={`loader ${className}`}></div>;
}
