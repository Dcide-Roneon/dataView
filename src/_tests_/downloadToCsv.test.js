import downloadToCsv from "../utils/downloadToCsv"; // Update path as needed

describe("downloadToCsv", () => {
  it("creates a downloadable CSV file from data", () => {
    const data = [
      {
        capacity: 106,
        certifications: ['SOC-I', 'PCI-DSS', 'SOC-II', 'ISO14001'],
        cloud_spend: 757057,
        company: "NimbusVault",
        contact_details: "contact@terralayer.com",
        dataCenter: "NorthDC",
        employee_count: 537,
        id: 1,
        industry: "Telecomms",
        intent_data: "Medium",
        latitude: 37.856343,
        longitude: -71.966865,
        use_cases: "AI Training"
      }
    ];

    // Mock browser APIs
    global.URL.createObjectURL = jest.fn(() => "blob:http://localhost/fake-url");

    const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});
    const removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation(() => {});
    const clickMock = jest.fn();
    const setAttributeMock = jest.fn();

    jest.spyOn(document, 'createElement').mockImplementation(() => ({
      setAttribute: setAttributeMock,
      click: clickMock,
      href: '',
    }));

    downloadToCsv(data);

    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(setAttributeMock).toHaveBeenCalledWith("download", "leads.csv");
    expect(clickMock).toHaveBeenCalled();
  });
});
