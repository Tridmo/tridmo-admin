import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

const CustomizedTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
    fontSize: '16px',
    pointerEvents: 'none',
  },
});

interface CustomTooltipProps {
  children?: any;
  title: string;
}

export function CustomTooltip({ children, title, placement, ...props }: CustomTooltipProps & TooltipProps) {
  return (
    <CustomizedTooltip title={title} placement={placement || 'top'}>
      {children}
    </CustomizedTooltip>
  )
}