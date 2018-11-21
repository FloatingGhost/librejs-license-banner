// @license d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat

// My apologies if some variable names are spelt "licence", I'll try and
// stick to the american english as per GNU's documentation.

/* Taken from the GNU's librejs project
   See https://www.gnu.org/software/librejs/manual/librejs.html#Free-Licenses-Detection
   Given in the format <Licence Name>: <magnet hash>
*/
const magnetMap = {
    "Apache-2.0": "8e4f440f4c65981c5bf93c76d35135ba5064d8b7&dn=apache-2.0.txt",
    "Artistic-2.0": "54fd2283f9dbdf29466d2df1a98bf8f65cafe314&dn=artistic-2.0.txt",
    "Boost-1.0": "89a97c535628232f2f3888c2b7b8ffd4c078cec0&dn=Boost-1.0.txt",
    "BSD-3-Clause": "c80d50af7d3db9be66a4d0a86db0286e4fd33292&dn=bsd-3-clause.txt",
    "CPAL-1.0": "84143bc45939fc8fa42921d619a95462c2031c5c&dn=cpal-1.0.txt",
    "CC0-1.0": "90dc5c0be029de84e523b9b3922520e79e0e6f08&dn=cc0.txt",
    "EPL-1.0": "4c6a2ad0018cd461e9b0fc44e1b340d2c1828b22&dn=epl-1.0.txt",
    "Expat": "d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt",
    "FreeBSD": "87f119ba0b429ba17a44b4bffcab33165ebdacc0&dn=freebsd.txt",
    "GPL-v2-or-Later": "cf05388f2679ee054f2beb29a391d25f4e673ac3&dn=gpl-2.0.txt",
    "GPL-v3-or-Later": "1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt",
    "LGPL-v2.1": "5de60da917303dbfad4f93fb1b985ced5a89eac2&dn=lgpl-2.1.txt",
    "LGPL-v3.0": "0ef1b8170b3b615170ff270def6427c317705f85&dn=lgpl-3.0.txt",
    "AGPL-v3.0": "0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt",
    "ISC": "b8999bbaf509c08d127678643c515b9ab0836bae&dn=ISC.txt",
    "MPL-2.0": "3877d6d54b3accd4bc32f8a48bf32ebc0901502a&dn=mpl-2.0.txt",
    "Public-Domain": "e95b018ef3580986a04669f1b5879592219e2a7a&dn=public-domain.txt",
    "UPL-1.0": "478974f4d41c3fa84c4befba25f283527fad107d&dn=upl-1.0.txt",
    "WTFPL": "723febf9f6185544f57f0660a41489c7d6b4931b&dn=wtfpl.txt",
    "Unlicense": "5ac446d35272cc2e4e85e4325b146d0b7ca8f50c&dn=unlicense.txt",
    "X11": "5305d91886084f776adcf57509a648432709a7c7&dn=x11.txt",
    "XFree86": "12f2ec9e8de2a3b0002a33d518d6010cc8ab2ae9&dn=xfree86.txt",
};

// Reformat the hash back into a valid magnet link
const toMagnetLink = (hash) => `magnet:?xt=urn:btih:${hash}`;

/* A list of common aliases 
   Will allow maintainers to specify "MIT" and get the right licence
   and such
*/
const licenseAliases = {
    "GPL": "GPL-v3-or-Later",
    "MIT": "Expat"
};


/**
 * @param {string} identifier The licence to get the banner for
 * @param {object} options A set of behaviour-altering switches
 *   @param {boolean} options.failOnNonexistent Raise an error if
 *                    a non-existent license is requested
 *   @param {boolean} options.quiet do not alert about aliases/nonexistent
 *                    licenses
 */
const getLicenseBanner = (
    identifier, 
    { failOnNonexistent = false, quiet = false } = {}) => {

    let licenseHash;
    if (magnetMap[identifier]) {
        // The licence exists in our standard map
        licenseHash = magnetMap[identifier];
    } else if (licenseAliases[identifier]) {
        // License exists in our alias map, warn the user and use it
        const dealiased = licenseAliases[identifier];

        if (!quiet) {
            console.warn(`License ${identifier} is not part of the standard ` +
                         `license set, assuming you mean ${dealiased}`);
        }

        licenseHash = magnetMap[dealiased];
        identifier = dealiased;

    } else {
        if (failOnNonexistent) {
            throw `Licence ${identifier} not found!`;
        }

        console.error(`Licence ${identifier} not found!`);
        licenseHash = "unknown";
    }

    return `// @license ${toMagnetLink(licenseHash)} ${identifier}`;
};

export default getLicenseBanner;

// @license-end
