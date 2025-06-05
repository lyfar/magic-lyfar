import { Flex } from "@/once-ui/components";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const Logo = ({ width = 43, height = 21, className }: LogoProps) => {
  return (
    <Flex 
      className={className}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        minWidth: `${width}px`,
        minHeight: `${height}px`
      }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 43.17 21.3"
        width="100%"
        height="100%"
      >
        <defs>
          <style>
            {`.d{fill:#020202;}.e{fill:#ef4726;}.f{fill:#6652a3;}.g{fill:#08753c;}`}
          </style>
        </defs>
        <g id="a"/>
        <g id="b">
          <g id="c">
            <path className="d" d="M43.17,21.3L22.14,0l-.14,21.16,21.16,.14Z"/>
            <path className="f" d="M0,0H21.06V6.44H0V0Z"/>
            <path className="g" d="M0,7.28H21.06v6.45H0V7.28Z"/>
            <path className="e" d="M0,14.41H21.06v6.89H0v-6.89Z"/>
          </g>
        </g>
      </svg>
    </Flex>
  );
}; 