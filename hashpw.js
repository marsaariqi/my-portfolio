// hashpw.js
// Use 'require' instead of 'import' for CommonJS modules
const { hash } = require("bcryptjs");

const createHash = async () => {
  // --- !!! CHANGE THIS TO YOUR REAL PASSWORD !!! ---
  const plainTextPassword = "Schizo23!";
  // --------------------------------------------------

  if (plainTextPassword === "your_plain_text_password_here") {
    console.error("Please edit hashpw.js and change the password.");
    return;
  }

  try {
    // 12 is a good "salt round" value
    const hashedPassword = await hash(plainTextPassword, 12);

    console.log("\n--- YOUR NEW HASH ---");
    console.log(
      "Copy this whole line (starting with $2a$...) and paste it into your MongoDB password field:"
    );
    console.log(hashedPassword);
    console.log("-----------------------\n");
  } catch (e) {
    console.error("Hashing failed:", e);
  }
};

createHash();
