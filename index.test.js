import getLicenseBanner from "./index";

test("correctly formats standard licenses", () => {
    const expected_output = "// @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat";

    expect(getLicenseBanner("Expat")).toBe(expected_output);
});

test("correct formats aliases licenses", () => {
    const expected_output = "// @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat";

    expect(getLicenseBanner("MIT")).toBe(expected_output);
});

test("does not fail on nonexistent licences unless specified", () => {
    const expected_output = "// @license magnet:?xt=urn:btih:unknown NotALicense";

    expect(getLicenseBanner("NotALicense")).toBe(expected_output);

    expect(() => getLicenseBanner("FailALicense", { failOnNonexistent: true })).toThrow(); 
});
