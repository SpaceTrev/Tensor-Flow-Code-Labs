console.log("Hello TensorFlow");
async function getData() {
  // fetches data
  const carsDataReq = await fetch(
    "https://storage.googleapis.com/tfjs-tutorials/carsData.json"
  );
  //   parses the body of the response to JSOn
  const carsData = await carsDataReq.json();
  //   maps over the response data and returns an object with keys mpg and horsepower with their values assigned to them from the response
  const cleaned = carsData
    .map(car => ({
      mpg: car.Miles_per_Gallon,
      horsepower: car.Horsepower
    }))
    // if any of the objects have null values in either of the keys the filter function won't include those values
    .filter(car => car.mpg != null && car.horsepower != null);
  // function returns the cleaned data
  return cleaned;
}
// Load and plot the original input data that we are going to train on.
async function run() {
  //   await the function above

  const data = await getData();
  //   map over the cleaned data and create an object with x and y key value pairs
  const values = data.map(d => ({
    x: d.horsepower,
    y: d.mpg
  }));
  // renders the tensor flow visualization and creates and scatter plot out of the data
  tfvis.render.scatterplot(
    { name: "Horsepower v MPG" },
    { values },
    {
      xLabel: "Horsepower",
      yLabel: "MPG",
      height: 300
    }
  );
  function createModel() {
    // Create a sequential model
    const model = tf.sequential();

    // Add a single hidden layer
    model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));

    // Add an output layer
    model.add(tf.layers.dense({ units: 1, useBias: true }));

    return model;
  }
  // More code will be added below
}
// event listener that fires the function when the dom content finishes loading
document.addEventListener("DOMContentLoaded", run);
