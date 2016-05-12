
ReactionCore.registerPackage({
  label: "Marketplace Finance",
  name: "reaction-p2p-marketplace-finance",
  icon: "fa fa-money",
  autoEnable: true,
  settings: {},
  registry: [
    {
      route: "/dashboard/transactions",
      template: "dashboardTransactionsList",
      name: "dashboard/transactions",
      label: "Transactions",
      icon: "fa fa-money",
      provides: "userAccountDropdown"
    },
  ],
});
