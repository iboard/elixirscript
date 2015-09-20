import Kernel from './kernel';
import Keyword from './keyword';

let Agent = {};

Agent.start = function(fun, options = []){
  const name = Keyword.has_key__qm__(options, Kernel.SpecialForms.atom("name")) ? Keyword.get(options, Kernel.SpecialForms.atom("name")) : Symbol();
  self.mailbox = self.mailbox.set(name, fun());
  return Kernel.SpecialForms.tuple(Kernel.SpecialForms.atom("ok"), name);
}

Agent.stop = function(agent, timeout = 5000){
  self.mailbox = self.mailbox.delete(agent);
  return Kernel.SpecialForms.atom("ok");
}

Agent.update = function(agent, fun, timeout = 5000){
  self.mailbox = self.mailbox.set(agent, fun(self.mailbox.get(agent)));
  return Kernel.SpecialForms.atom("ok");
}

Agent.get = function(agent, fun, timeout = 5000){
  return fun(self.mailbox.get(agent));
}

Agent.get_and_update = function(agent, fun, timeout = 5000){
  const get_and_update_tuple = fun(self.mailbox.get(agent));
  self.mailbox = self.mailbox.set(agent, Kernel.elem(get_and_update_tuple, 1));

  return Kernel.elem(get_and_update_tuple, 0);
}

export default Agent;
