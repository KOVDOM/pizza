using ContosoPizza.Models;

namespace ContosoPizza.Services;

public static class PizzaService
{
    static List<Pizza> Pizzas { get; }
    static int nextId = 4;
    static PizzaService()
    {
        Pizzas = new List<Pizza>
        {
            new Pizza { Id = 1, Name = "Négysajtos pizza", IsGlutenFree = 0, KepURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fparkpizza.hu%2Fwp-content%2Fuploads%2F2018%2F05%2FN%25C3%25A9gysajtos-pizza.jpg&f=1&nofb=1&ipt=aec291f02b2c6cf7c3a0903b03b44b9dcba4f470587e554552ee50eb71d7f896&ipo=images" },
            new Pizza { Id = 2, Name = "Hawaii pizza", IsGlutenFree = 1, KepURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.kidspot.com.au%2FKp4xCs5h%2Fw1200-h630-cfill%2Fkk%2F2015%2F03%2Fhawaiian-pizza-recipe-605894-2.jpg&f=1&nofb=1&ipt=0aed9af34910446d761f63f20c3ce29fcb92843800904c79285aa49d5c51cbaa&ipo=images" },
            new Pizza { Id = 3, Name = "Vegán pizza", IsGlutenFree = 1, KepURL="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.wp.com%2Fsimple-veganista.com%2Fwp-content%2Fuploads%2F2012%2F07%2Fpineapple-veggie-lovers-pizza_7.jpg&f=1&nofb=1&ipt=bcc081119005da30450f3056a88e6ab8a93d0be9be5e59259087c7e07586dcf6&ipo=images" }
        };
    }

    public static List<Pizza> GetAll() => Pizzas;

    public static Pizza? Get(int id) => Pizzas.FirstOrDefault(p => p.Id == id);

    public static void Add(Pizza pizza)
    {
        pizza.Id = nextId++;
        Pizzas.Add(pizza);
    }

    public static void Delete(int id)
    {
        var pizza = Get(id);
        if(pizza is null)
            return;

        Pizzas.Remove(pizza);
    }

    public static void Update(Pizza pizza)
    {
        var index = Pizzas.FindIndex(p => p.Id == pizza.Id);
        if(index == -1)
            return;

        Pizzas[index] = pizza;
    }
}