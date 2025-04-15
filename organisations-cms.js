document.addEventListener("DOMContentLoaded", function () {
  // Part 1: Hide tab panels and links when all CMS items are hidden
  // Get all tab panels
  const tabPanels = document.querySelectorAll(".w-tab-pane");

  // Process each tab panel
  tabPanels.forEach((panel) => {
    // Get all list items in this panel
    const listItems = panel.querySelectorAll('[role="listitem"]');

    // Skip if no list items found
    if (listItems.length === 0) return;

    // Check if all list items are hidden
    const allItemsHidden = Array.from(listItems).every((item) => {
      return item.querySelector('[data-cms-hide="true"]') !== null;
    });

    // If all items are hidden, hide the panel and its tab link
    if (allItemsHidden) {
      // Get the tab identifier
      const tabId = panel.getAttribute("data-w-tab");

      // Hide the tab panel
      panel.style.display = "none";

      // Find and hide the corresponding tab link
      if (tabId) {
        const tabLink = document.querySelector(
          `.w-tab-link[data-w-tab="${tabId}"]`
        );
        if (tabLink) {
          tabLink.style.display = "none";
        }
      }
    }
  });

  // Part 2: Handle tab selection when current tab is hidden (converted from jQuery)
  // Iterate through each tab group
  const tabGroups = document.querySelectorAll(".w-tabs");

  tabGroups.forEach((tabGroup) => {
    // Check if the currently active tab is hidden
    const currentTab = tabGroup.querySelector(".w--current");

    if (currentTab && window.getComputedStyle(currentTab).display === "none") {
      // Find the first visible tab and click it
      const firstVisibleTab = tabGroup.querySelector(
        '[data-w-tab]:not([style*="display: none"])'
      );

      if (firstVisibleTab) {
        firstVisibleTab.click();
      }
    }
  });
});
