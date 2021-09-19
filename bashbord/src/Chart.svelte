<script>
    import Bar from "svelte-chartjs/src/Bar.svelte"

    const q = window.faunadb.query;
    const faunaClient = new faunadb.Client({
        secret: "secret_key",
    });

    let options = {
        responsive: true,
        scales: {
        yAxes: [
            {
            ticks: {
                beginAtZero: true
            }
            }
        ]
        }
    }

    function getRandomColor() {
        let x1 = Math.round(Math.random()*255)
        let x2 = Math.round(Math.random()*255)
        let x3 = Math.round(Math.random()*255)
        return `rgb(${x1},${x2},${x3})`
    }

    async function getFaunaData() {
        let faunaData = await faunaClient.query(q.Map(
            q.Paginate(q.Documents(q.Collection("data"))),
            q.Lambda(x => q.Get(x))
            ));
        faunaData = faunaData.data.pop().data

        let barData = Object.values(faunaData)
        let barLabels = Object.keys(faunaData)
        let barColors = barData.map(() => getRandomColor());
    
        data = {
            labels: barLabels,
            datasets: [
            {
                label: 'Attempts',
                data: barData,
                backgroundColor: barColors,
            }
            ]
        };
    
        return data
    }

    // let data = getFaunaData()
</script>

{#await data}
    <p>...waiting for data</p>
{:then}
    <div class="graph">
        <Bar {data} {options} />
    </div>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}