import Link from "next/link";
import CompanyName from "./companyName";
import Logo from "./logo";

const LogoWithCompanyName: React.FC = () => {
  return (
    <Link
      href="/"
      className="grid grid-cols-[25px_90px] md:grid-cols-[60px_200px] gap-2 md:gap-5 items-baseline"
    >
      <Logo />
      <CompanyName />
    </Link>
  );
};

export default LogoWithCompanyName;
