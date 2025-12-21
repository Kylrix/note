"use client";

import { AppWithLoading } from "@/components/ui/AppWithLoading";
import { AuthProvider } from "@/components/ui/AuthContext";
import { OverlayProvider } from "@/components/ui/OverlayContext";
import { SubscriptionProvider } from "@/components/ui/SubscriptionContext";
import { RouteGuard } from "@/components/ui/RouteGuard";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import Overlay from "@/components/ui/Overlay";
import { ContextMenuProvider } from "@/components/ui/ContextMenuContext";
import { GlobalContextMenu } from "@/components/ui/GlobalContextMenu";
import GlobalShortcuts from "@/components/GlobalShortcuts";

import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/theme/theme";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <ToastProvider>
                    <AppWithLoading>
                        <AuthProvider>
                            <SubscriptionProvider>
                                <OverlayProvider>
                                    <ContextMenuProvider>
                                        <RouteGuard>
                                            {children}
                                        </RouteGuard>
                                        <Overlay />
                                        <GlobalContextMenu />
                                        <GlobalShortcuts />
                                    </ContextMenuProvider>
                                </OverlayProvider>
                            </SubscriptionProvider>
                        </AuthProvider>
                    </AppWithLoading>
                </ToastProvider>
            </MuiThemeProvider>
        </ThemeProvider>
    );
}
