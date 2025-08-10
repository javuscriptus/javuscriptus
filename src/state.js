// A simple mutable state object for animations
// This helps avoid prop-drilling for values that change every frame.
const animationState = {
  workSection: {
    glitchAmount: 1.0,
  },
  // We can add states for other sections here later
};

export default animationState;
