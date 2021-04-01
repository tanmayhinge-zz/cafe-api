const {AuthenticationError} = require('apollo-server');

const Order = require('../../models/Order');
const checkAuth = require('../../util/check_auth')
module.exports = {
  Query: {
    async getOrders() {
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        return orders;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getOrder(_, { orderId }) {
      try {
        const order = await Order.findById(orderId);
        if (order) {
          return order;
        } else {
          throw new Error('Order not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createOrder(_, {item}, context){
      const user = checkAuth(context);
      
      // console.log(user)
      const newOrder = new Order({
        item,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const order = await newOrder.save();

      return order;
    },
    async deleteOrder(_, {orderId}, context){

      const user = checkAuth(context);
      // console.log("All ok")

      try{
        const order = await Order.findById(orderId);
        if(user.username === order.username){
          await order.delete()
          return 'Order deleted'
        }else{
          throw new AuthenticationError('Action not allowed')
        }
      }
      catch(err){
        throw new Error(err)
      }
    }
  }
};