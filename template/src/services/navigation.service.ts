import { CommonActions, StackActions } from '@react-navigation/native';
import { navigationRef } from '~configs/globalRefs';

/**
 * Navigation Service - Singleton class for navigation
 * Provides centralized navigation control for the app
 */
class NavigationService {
  /**
   * Get the current navigation reference
   */
  getNavigationRef() {
    return navigationRef;
  }

  /**
   * Check if navigation is ready
   */
  isNavigationReady(): boolean {
    return navigationRef?.isReady() ?? false;
  }

  /**
   * Navigate to a specific screen
   */
  navigate(name: any, params?: any) {
    if (navigationRef?.isReady()) {
      navigationRef.navigate(name, params);
    } else {
      console.warn('Navigation is not ready yet');
    }
  }

  /**
   * Go back to previous screen
   */
  goBack() {
    if (navigationRef?.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }

  /**
   * Push a new screen onto the stack
   */
  push(name: string, params?: any) {
    if (navigationRef?.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
  }

  /**
   * Pop screens from the stack
   */
  pop(count = 1) {
    if (navigationRef?.isReady()) {
      navigationRef.dispatch(StackActions.pop(count));
    }
  }

  /**
   * Pop to top of the stack
   */
  popToTop() {
    if (navigationRef?.isReady()) {
      navigationRef.dispatch(StackActions.popToTop());
    }
  }

  /**
   * Replace current screen with new one
   */
  replace(name: string, params?: any) {
    if (navigationRef?.isReady()) {
      navigationRef.dispatch(StackActions.replace(name, params));
    }
  }

  /**
   * Reset navigation stack to specific screen(s)
   */
  reset(routes: Array<{ name: string; params?: any }>, index = 0) {
    if (navigationRef?.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index,
          routes,
        }),
      );
    }
  }

  /**
   * Reset to home screen
   */
  resetToHome() {
    this.reset([{ name: 'Home' }]);
  }

  /**
   * Reset to auth screen
   */
  resetToAuth() {
    this.reset([{ name: 'Auth' }]);
  }

  /**
   * Get current route name
   */
  getCurrentRouteName(): string | undefined {
    if (navigationRef?.isReady()) {
      return navigationRef.getCurrentRoute()?.name;
    }
    return undefined;
  }

  /**
   * Get current route params
   */
  getCurrentRouteParams(): any {
    if (navigationRef?.isReady()) {
      return navigationRef.getCurrentRoute()?.params;
    }
    return undefined;
  }

  /**
   * Check if current route matches given name
   */
  isCurrentRoute(routeName: string): boolean {
    return this.getCurrentRouteName() === routeName;
  }

  /**
   * Navigate to marketplace/home
   */
  navigateToHome(params?: any) {
    this.navigate('Home', params);
  }

  /**
   * Navigate to product detail
   */
  navigateToProductDetail(productSlug: string, variantId?: string) {
    this.navigate('ProductDetail', {
      slug: productSlug,
      variant_id: variantId,
    });
  }

  /**
   * Navigate to seller store
   */
  navigateToSellerStore(sellerId: string, sellerSlug?: string) {
    this.navigate('SellerStore', {
      seller_id: sellerId,
      seller_slug: sellerSlug,
    });
  }

  /**
   * Navigate to cart
   */
  navigateToCart() {
    this.navigate('Cart');
  }

  /**
   * Navigate to checkout
   */
  navigateToCheckout(params?: any) {
    this.navigate('Checkout', params);
  }

  /**
   * Navigate to order detail
   */
  navigateToOrderDetail(orderId: string) {
    this.navigate('OrderDetail', { order_id: orderId });
  }

  /**
   * Navigate to profile/account
   */
  navigateToProfile() {
    this.navigate('Profile');
  }

  /**
   * Navigate to auth screens
   */
  navigateToAuth(screen?: string, params?: any) {
    if (screen) {
      this.navigate(screen, params);
    } else {
      this.navigate('Auth');
    }
  }

  /**
   * Navigate to search with optional query
   */
  navigateToSearch(query?: string, filters?: any) {
    this.navigate('Search', {
      query,
      filters,
    });
  }

  /**
   * Navigate to category
   */
  navigateToCategory(categoryId: string, categorySlug?: string) {
    this.navigate('Category', {
      category_id: categoryId,
      category_slug: categorySlug,
    });
  }

  /**
   * Navigate to wishlist/favorites
   */
  navigateToWishlist() {
    this.navigate('Wishlist');
  }

  /**
   * Navigate to notifications
   */
  navigateToNotifications() {
    this.navigate('Notifications');
  }

  /**
   * Navigate to help/support
   */
  navigateToHelp() {
    this.navigate('Help');
  }

  /**
   * Navigate with delay (useful for after animations)
   */
  navigateWithDelay(name: string, params?: any, delay = 100) {
    setTimeout(() => {
      this.navigate(name, params);
    }, delay);
  }

  /**
   * Safe navigation - only navigate if not already on target screen
   */
  safeNavigate(name: string, params?: any) {
    if (!this.isCurrentRoute(name)) {
      this.navigate(name, params);
    }
  }

  /**
   * Navigate and clear history (for logout, etc.)
   */
  navigateAndClearHistory(name: string, params?: any) {
    this.reset([{ name, params }]);
  }

  /**
   * Check if can go back
   */
  canGoBack(): boolean {
    return navigationRef?.canGoBack() ?? false;
  }

  /**
   * Get navigation state
   */
  getNavigationState() {
    return navigationRef?.getState();
  }

  /**
   * Execute action only when navigation is ready
   */
  whenReady(callback: () => void) {
    if (this.isNavigationReady()) {
      callback();
    } else {
      // Wait for navigation to be ready
      const checkReady = () => {
        if (this.isNavigationReady()) {
          callback();
        } else {
          setTimeout(checkReady, 50);
        }
      };
      checkReady();
    }
  }

  /**
   * Navigate with authentication check
   */
  navigateWithAuth(name: string, params?: any, authChecker?: () => boolean) {
    if (authChecker && !authChecker()) {
      this.navigateToAuth();
      return;
    }
    this.navigate(name, params);
  }
}

export const navigationService = new NavigationService();
