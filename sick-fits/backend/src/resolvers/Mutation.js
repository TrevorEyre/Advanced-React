const mutations = {
  createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    return ctx.db.mutation.createItem({ data: { ...args } }, info)
  },
  updateItem(parent, args, ctx, info) {
    const { id, ...item } = args
    return ctx.db.mutation.updateItem({ data: item, where: { id } }, info)
  }
};

module.exports = mutations;
