#!/bin/bash

cd /Users/what_a_big_chuner/PortfolioWebsite/xuechundesign.github.io/;

browser() {
  sleep 2
  open http://localhost:4000

}
serve(){
  jekyll serve -w -l --host=0.0.0.0
}

browser & serve
