const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const root =$('.root')
const inputCar =$('#input-cars')
const btnSubmit =$('.submit')


const app = (()=>{
    const cars = ['BMV'];

    return {
        add(car){
            cars.push(car)
        },
        delete(index){
            cars.splice(index,1)
        },
        render(){
            const html = cars.map((car,index)=>{
                return `
                    <li>${car}
                        <span class="delete" data-index="${index}">&times</span>
                    </li>
                `
            }).join('')
            root.innerHTML = html
        },
        handleDelete(e){
            const btnDelete = e.target.closest('.delete');
            if(btnDelete){
                const index = btnDelete.dataset.index
                this.delete(index);
                this.render()
            }
        },
        init(){ 
            btnSubmit.onclick = ()=>{
                const car = inputCar.value;
                this.add(car);
                this.render()
                inputCar.value ="";
                inputCar.focus();
            }

            root.onclick = this.handleDelete.bind(this
                )
            this.render()
        }
        
        
        

    }
})()

app.init()