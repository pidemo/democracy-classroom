document.addEventListener("DOMContentLoaded", function () {
  // Part 1: Remove tab panels and links when all CMS items are hidden, or when they're hidden by CMS condition
  const tabsHidden = document.querySelectorAll(
    "a.tab-link.w-condition-invisible"
  );
  tabsHidden.forEach((tabLink) => {
    const tabId = tabLink.getAttribute("data-w-tab");
    const tabPanel = document.querySelector(
      `.w-tab-pane[data-w-tab="${tabId}"]`
    );
    tabLink.remove();
    tabPanel.remove();
  });

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
      panel.remove();

      // Find and hide the corresponding tab link
      if (tabId) {
        const tabLink = document.querySelector(
          `.w-tab-link[data-w-tab="${tabId}"]`
        );
        if (tabLink) {
          tabLink.remove();
        }
      }
    }
  });

  // Part 2: Handle tab selection when current tab is hidden (converted from jQuery)
  // Get first visible tab and make it active
  const firstVisibleTab = document.querySelector("a.tab-link");
  firstVisibleTab.classList.add("w--current");
  firstVisibleTab.tabIndex = 0;
  firstVisibleTab.setAttribute("aria-selected", "true");

  // Get the tab panel and add the active class
  const tabPanel = document.querySelector(`.w-tab-pane[data-w-tab="${tabId}"]`);
  tabPanel.classList.add("w--tab-active");
});
