// Utility to export donation logs to CSV or JSON for audit and compliance

export function exportDonationsToCsv(donations, donorName = 'FoodDonor') {
  if (!donations || donations.length === 0) {
    alert('No donations available to export.');
    return;
  }

  const headers = [
    'Donation ID',
    'Donor Name',
    'Food Title',
    'Category',
    'Quantity (kg)',
    'Portions',
    'Status',
    'FSSAI Status',
    'CO2e Saved (kg)',
    'Water Saved (L)',
    'Prepared At'
  ];

  const rows = donations.map((d) => [
    `"${d.id}"`,
    `"${d.donorName}"`,
    `"${d.title.replace(/"/g, '""')}"`,
    `"${d.category}"`,
    d.quantityKg,
    d.portions,
    `"${d.status}"`,
    `"${d.fssaiStatus}"`,
    d.co2eSavedKg,
    d.waterSavedLiters,
    `"${d.preparedAt}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${donorName.replace(/\s+/g, '_')}_Donations_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
