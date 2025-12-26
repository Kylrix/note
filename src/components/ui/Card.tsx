import React from 'react';
import { Card as MuiCard, CardHeader as MuiCardHeader, CardContent as MuiCardContent, CardActions as MuiCardActions, Typography, Box } from '@mui/material';

const Card = React.forwardRef<
  HTMLDivElement,
  any
>(({ className, children, ...props }, ref) => (
  <MuiCard
    ref={ref}
    {...props}
  >
    {children}
  </MuiCard>
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  any
>(({ className, children, ...props }, ref) => (
  <Box
    ref={ref}
    sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}
    {...props}
  >
    {children}
  </Box>
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  any
>(({ className, children, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="h3"
    {...props}
  >
    {children}
  </Typography>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  any
>(({ className, children, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="body2"
    color="text.secondary"
    {...props}
  >
    {children}
  </Typography>
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  any
>(({ className, children, ...props }, ref) => (
  <MuiCardContent ref={ref} sx={{ p: 3, pt: 0 }} {...props}>
    {children}
  </MuiCardContent>
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  any
>(({ className, children, ...props }, ref) => (
  <MuiCardActions
    ref={ref}
    sx={{ p: 3, pt: 0, display: 'flex', alignItems: 'center' }}
    {...props}
  >
    {children}
  </MuiCardActions>
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

