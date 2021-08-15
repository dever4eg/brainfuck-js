for file in $(find . -name '*.test.js' | grep -v 'node_modules')
do
  echo "Running test: $file"
  node "$file"
done
