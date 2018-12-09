module.exports = {
  Query: {
    getUser: () => null
  },
  Mutation: {
    signUpUser: async (_, { username, email, password }, { User }, info) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return newUser;
    }
  }
};