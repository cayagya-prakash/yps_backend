import bcrypt from 'bcryptjs'

async function generateHash() {
  const users = [
    { email: "cayagya@gmail.com", password: "cayps@123" },
  ];

  for (let user of users) {
    const hash = await bcrypt.hash(user.password, 10);
    console.log(`${user.email} → ${hash}`);
  }
}


generateHash();
