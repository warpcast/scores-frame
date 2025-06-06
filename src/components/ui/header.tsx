'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

function HeaderLogoSvg({
  className,
  onClick,
}: {
  className: string;
  onClick: () => void;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className={className}
      onClick={onClick}
    >
      <g clip-path="url(#clip0_75_82)">
        <circle cx="15" cy="15" r="15" fill="#7C65C1" />
        <path
          d="M14.9998 22.5093C15.8475 22.5093 17.6744 25.2722 18.471 24.9781C19.2677 24.6838 18.9169 21.3757 19.5664 20.8225C20.2158 20.2694 23.3651 21.1944 23.7892 20.4494C24.213 19.7044 21.8491 17.3988 21.9964 16.5516C22.1436 15.7045 25.1421 14.3584 24.9947 13.5113C24.8476 12.664 21.5765 12.44 21.1524 11.695C20.7286 10.9499 22.173 7.96306 21.5235 7.40978C20.8742 6.85675 18.2264 8.81905 17.4298 8.52475C16.6331 8.23046 15.8477 5 15 5C14.1523 5 13.3669 8.23043 12.5702 8.52475C11.7736 8.81908 9.12584 6.85675 8.47646 7.40978C7.82712 7.96282 9.27143 10.95 8.8476 11.695C8.42376 12.44 5.15245 12.6641 5.00524 13.5113C4.85806 14.3586 7.85643 15.7045 8.0036 16.5516C8.15079 17.3988 5.78678 19.7044 6.21078 20.4494C6.63461 21.1944 9.78419 20.2696 10.4336 20.8225C11.0829 21.3755 10.7323 24.6836 11.529 24.9781C12.3256 25.2723 14.1523 22.5093 15.0002 22.5093H14.9998Z"
          fill="white"
        />
        <path
          d="M17.169 12.7034H18.3276L18.1621 13.6138H17.8724V17.0897L17.8852 17.09C18.0164 17.0966 18.1207 17.2051 18.1207 17.3379V17.5448L18.1335 17.5452C18.2646 17.5518 18.369 17.6603 18.369 17.7931V18H16.0517V17.7931C16.0517 17.6603 16.156 17.5518 16.2872 17.5452L16.3 17.5448V17.3379C16.3 17.2051 16.4043 17.0966 16.5355 17.09L16.5483 17.0897V15.3931C16.5483 14.5018 15.8258 13.7793 14.9345 13.7793C14.0432 13.7793 13.3207 14.5018 13.3207 15.3931V17.0897L13.3335 17.09C13.4646 17.0966 13.569 17.2051 13.569 17.3379V17.5448L13.5817 17.5452C13.7129 17.5518 13.8172 17.6603 13.8172 17.7931V18H11.5V17.7931C11.5 17.6603 11.6043 17.5518 11.7355 17.5452L11.7483 17.5448V17.3379C11.7483 17.2051 11.8526 17.0966 11.9838 17.09L11.9966 17.0897V13.6138H11.7069L11.5414 12.7034H12.7V12H17.169V12.7034Z"
          fill="#7C65C1"
        />
      </g>
      <defs>
        <clipPath id="clip0_75_82">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Header() {
  const router = useRouter();

  const onLogoClick = React.useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="w-full flex flex-row items-center justify-between p-4">
      <HeaderLogoSvg className="opacity-100" onClick={onLogoClick} />
      <div className="text-xl font-semibold pt-[2px] leading-[30px] h-[30px]">
        Rewards
      </div>
      <div className="opacity-0 h-[30px] w-[30px]" />
    </div>
  );
}

export { Header };
