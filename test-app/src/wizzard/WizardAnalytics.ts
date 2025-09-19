export class WizardAnalytics {
  private validationSubscribers: number = 0;
  private isValidationUsed: boolean = false;

  // Track validation subscription
  trackValidationSubscription() {
    this.validationSubscribers++;
    this.isValidationUsed = true;
  }

  // Track validation unsubscription
  trackValidationUnsubscription() {
    this.validationSubscribers = Math.max(0, this.validationSubscribers - 1);
    // Set to false if no subscribers
    if (this.validationSubscribers === 0) {
      this.isValidationUsed = false;
    }
  }

  // Check if validation feature is being used
  hasValidationFeature() {
    return this.isValidationUsed;
  }

  // Get validation subscriber count
  getValidationSubscriberCount() {
    return this.validationSubscribers;
  }

  // Get analytics data
  getAnalytics() {
    return {
      validationSubscribers: this.validationSubscribers,
      isValidationUsed: this.isValidationUsed,
    };
  }

  // Reset analytics
  reset() {
    this.validationSubscribers = 0;
    this.isValidationUsed = false;
  }
}
