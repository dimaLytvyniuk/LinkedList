'use strict';

function Node(prev, data) {
  this.prev = prev;
  this.data = data;
}

function LinkedList() { 
  this.head = null;
  this.tail = null;
}

LinkedList.prototype.push = function(...args) {
  args.forEach(arg => {
    if (this.head) {
      if (this.tail) {
        this.tail = new Node (this.tail, arg);
      } else {
        this.tail = new Node (this.head,arg);
      }
    } else {
      this.head = new Node(null,arg);
    }
  });
}

LinkedList.prototype.unshift = function(...args) {
    args.forEach(arg => {
    if (this.head) {
      const node = new Node(null,arg);
      this.head.prev = node;
      if (!this.tail) this.tail = this.head;
      this.head = node;
    } else {
      this.head = new Node(null,arg);
    }
  });
}

LinkedList.prototype.insert = function(num,data) {
  let node = this.tail;
  for (let i = 0; i < num - 1 && node; i++) {
    node = node.prev;
  }
  
  if (node && num > 0) {
    const new_node = new Node(node.prev,data);
    node.prev =  new_node;
    return true;
  } else if (num === 0) {
    this.push(data);
    return true;
  } else {
    return false;
  }
}

LinkedList.prototype.erase = function(num) {
  let node = this.tail;
  for (let i = 0; i < num - 1 && node; i++) {
    node = node.prev;
  }

  if (node && node.prev) {
    const new_node = node.prev;
    node.prev = node.prev.prev;
    return new_node;
  } else {
    return false;
  } 
}

LinkedList.prototype.shift = function() {
  if (this.head)
  {
    const new_node = this.head;
    this.head = null;
    if (this.tail)
    {
      let node = this.tail;
      while (node.prev.prev) {
        node = node.prev;
      }
      node.prev = null;
      this.head = node;
    } 
      return new_node;
  } else {
    return false;
  }
}

LinkedList.prototype.pop = function() {
  let new_node = null;
  if (this.tail) {
    new_node = this.tail;
    this.tail = this.tail.prev;
  } else {
    new_node = this.head;
    this.head  = null;
  }
  return new_node;
}

LinkedList.prototype.print = function(){
  let node = this.tail;
  while (node){
    console.log(node.data);
    node = node.prev;
  }
}

LinkedList.prototype.findFirst = function(name) {
  let node = this.tail;
  while (node) {
    if (node.data.name === name) return node;
    node = node.prev;
  }
  return false;
}

LinkedList.prototype.findAll = function(name) {
  const arr = new Array();
  let node = this.tail;
  while (node) {
    if (node.data.name === name) arr.push(node);
    node = node.prev;
  }
  return arr;
}

LinkedList.prototype.find = function(name,callback) {
  let node = this.tail;
  while (node) {
    if (node.data.name.search(name) !== -1) callback(node);
    node = node.prev;
  }
}

LinkedList.prototype.append = function(arr) {
  arr.forEach(element => {
    this.push(element);
  });
};

const list = new LinkedList();

list.push({ name: 'first' },{ name: 'first' },{ name: 'third' });
list.unshift({ name: 'fourth' },{ name: 'fifth' },{ name: 'sixth' });
//list.insert(1,{name: 'seven'});
list.print();
console.log();
//console.log(list.erase(4).data);
//console.log(list.shift().data);
//console.log(list.pop());
/*
list.find('first', function(node) {
  console.log(node.data);
});
*/
console.log();
/*
list.find( /f/i , function(node) {
  console.log(node.data);
});
*/
//console.log();
//list.push(list.findAll('first'));
list.append([{ name: 'fourth' },{ name: 'fifth' },{ name: 'sixth' }]);
list.print();