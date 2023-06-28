import {IData} from "../types";

export const levels:IData[] = [
    {
        helpTitle : "Select elements by their type",
        selectorName : "Type Selector",
        doThis : "Select the plates",
        selector : "plate",
        syntax : "A",
        help : "Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
        examples : [
            '<strong>div</strong> selects all <tag>div</tag> elements.',
            '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: `
    <plate/>
    <plate/>
    `
    },
    {
        doThis : "Select the tray boxes",
        selector : "tray",
        syntax : "A",
        helpTitle : "Select elements by their type",
        selectorName : "Type Selector",
        help : "Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
        examples : [
            '<strong>div</strong> selects all <tag>div</tag> elements.',
            '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: `
    <plate/>
    <tray/>
    `
    },
    {
        doThis : "Select the fancy plate",
        selector : "#fancy",
        selectorName: "ID Selector",
        helpTitle: "Select elements with an ID",
        syntax: "#id",
        help : 'Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.',
        examples : [
            '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
            '<strong>ul#long</strong> selects <tag>ul id="long"</tag>'
        ],
        boardMarkup : `
    <plate id="fancy"/>
    <plate/>
    <tray/>
    `
    },
    {
        helpTitle: "Select an element inside another element",
        selectorName : "Descendant Selector",
        doThis : "Select the tomato on the plate",
        selector : "plate tomato",
        syntax: "A&nbsp;&nbsp;B",
        help : "Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.",
        examples : [
            '<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>',
            '<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
        ],
        boardMarkup : `
    <tray/>
    <plate>
      <tomato/>
    </plate>
    <tomato/>
    `
    },
    {
        selectorName : "Гавно",
        doThis : "Select the cucumber on the fancy plate",
        selector : "#fancy cucumber",
        helpTitle: "Combine the Descendant & ID Selectors",
        syntax: "#id&nbsp;&nbsp;A",
        help : 'You can combine any selector with the descendent selector.',
        examples : [
            '<strong>#cool&nbsp;span</strong> selects all <tag>span</tag> elements that are inside of elements with <strong>id="cool"</strong>'
        ],
        boardMarkup : `
    <tray>
    <lemon/>
    </tray>
    <plate id="fancy">
      <cucumber/>
    </plate>
    <plate>
      <cucumber/>
    </plate>
    `
    },
    {
        doThis : "Select the small tomatos",
        selector : ".small",
        selectorName: "Class Selector",
        helpTitle: "Select elements by their class",
        syntax: ".classname",
        help : 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
        examples : [
            '<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>'
        ],
        boardMarkup : `
    <tomato/>
    <tomato class="small"/>
    <plate>
      <tomato class="small"/>
    </plate>
    <plate/>
    `
    },
    {
        selectorName : "Гавно",
        doThis : "Select the small lemons",
        selector : "lemon.small",
        helpTitle: "Combine the Class Selector",
        syntax: "A.className",
        help : 'You can combine the class selector with other selectors, like the type selector.',
        examples : [
            '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
            '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>'
        ],
        boardMarkup :`
    <tomato/>
    <tomato class="small"/>
    <tray>
      <lemon class="small"/>
    </tray>
    <plate>
      <lemon/>
    </plate>
    <plate>
      <lemon class="small"/>
    </plate>`
    },
    {
        doThis : "Select all the plates and trays",
        selector : "plate,tray",
        selectorName : "Comma Combinator",
        helpTitle: "Combine, selectors, with... commas!",
        syntax : "A, B",
        help : 'Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
        examples: [
            '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
            '<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements'
        ],
        boardMarkup : `
    <cucumber class="small"/>
    <cucumber/>
    <plate>
      <cucumber/>
    </plate>
    <tray>
      <cucumber/>
    </tray>
    <plate>
      <cucumber/>
    </plate>
    <cucumber/>
    <cucumber class="small"/>
    `
    },
    {
        doThis : "Select all the things!",
        selector : "*",
        selectorName:  "The Universal Selector",
        helpTitle: "You can select everything!",
        syntax : "*",
        help : 'You can select all elements with the universal selector! ',
        examples : [
            '<strong>p *</strong> selects any element inside all <tag>p</tag> elements.',
        ],
        boardMarkup : `
    <tomato/>
    <plate>
      <lemon class="small" />
    </plate>
    <tray/>
    <tray>
      <lemon/>
    </tray>
    <plate id="fancy"/>
    `
    },
    {
        doThis : "Select every tomato that's next to a plate",
        selector : "plate + tomato",
        helpTitle: "Select an element that directly follows another element",
        selectorName: "Adjacent Sibling Selector",
        syntax : "A + B",
        help : "This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.",
        examples : [
            '<strong>p + .intro</strong> selects every element with <strong>class="intro"</strong> that directly follows a <tag>p</tag>',
            '<strong>div + a</strong> selects every <tag>a</tag> element that directly follows a <tag>div</tag>'
        ],
        boardMarkup : `
    <tray>
      <tomato class="small"/>
    </tray>
    <plate />
    <tomato class="small"/>
    <plate />
    <tomato/>
    <tomato class="small"/>
    <tomato class="small"/>
    `
    },
    {
        selectorName: "General Sibling Selector",
        helpTitle: "Select elements that follows another element",
        syntax: "A ~ B",
        doThis : "Select the cucumbers beside the tray",
        selector : "tray ~ cucumber",
        help : "You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.",
        examples : [
            '<strong>A ~ B</strong> selects all <strong>B</strong> that follow a <strong>A</strong>'
        ],
        boardMarkup : `
    <cucumber/>
    <tray>
      <lemon class="small"/>
    </tray>
    <cucumber class="small"/>
    <cucumber/>
    <plate>
      <cucumber/>
    </plate>
    <plate>
      <cucumber class="small"/>
    </plate>
    `
    },
    {
        selectorName: "Child Selector",
        syntax: "A > B&nbsp;",
        doThis : "Select the tomato directly on a plate",
        selector : "plate > tomato",
        helpTitle: "Select direct children of an element",
        help : "You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element. <br><br>Elements that are nested deeper than that are called descendant elements.",
        examples : [
            '<strong>A > B</strong> selects all <strong>B</strong> that are a direct children <strong>A</strong>'
        ],
        boardMarkup: `
    <tray>
      <plate>
        <tomato/>
      </plate>
    </tray>
    <plate>
      <tomato/>
    </plate>
    <plate/>
    <tomato/>
    <tomato class="small"/>
    `
    },
    {
        selectorName: "First Child Pseudo-selector",
        helpTitle: "Select a first child element inside of another element",
        doThis : "Select the top lemon",
        selector : "plate :first-child",
        syntax: ":first-child",

        help : "You can select the first child element. A child element is any element that is directly nested in another element. You can combine this pseudo-selector with other selectors.",
        examples : [
            '<strong>:first-child</strong> selects all first child elements.',
            '<strong>p:first-child</strong> selects all first child <tag>p</tag> elements.',
            '<strong>div p:first-child</strong> selects all first child <tag>p</tag> elements that are in a <tag>div</tag>.'
        ],
        boardMarkup :`
    <tray/>
    <plate />
    <plate>
      <lemon />
      <lemon />
      <lemon />
    </plate>
    <cucumber class="small" />
    `
    },
    {
        selectorName: "Only Child Pseudo-selector",
        helpTitle: "Select an element that are the only element inside of another one.",
        doThis : "Select the tomato and the cucumber on the plates",
        selector : "plate :only-child",
        syntax: ":only-child",
        help : "You can select any element that is the only element inside of another one.",
        examples : [
            '<strong>span:only-child</strong> selects the <tag>span</tag> elements that are the only child of some other element.',
            '<strong>ul li:only-child</strong> selects the only <tag>li</tag> element that are in a <tag>ul</tag>.'
        ],
        boardMarkup : `
    <plate>
      <tomato/>
    </plate>
    <plate>
      <cucumber />
    </plate>
    <tray>
      <cucumber />
    </tray>
    <plate>
      <lemon class="small"/>
      <lemon/>
    </plate>
    <cucumber class="small"/>
    `
    },
    {
        selectorName: "Nth Child Pseudo-selector",
        helpTitle: "Select an element by its order in another element",
        doThis : "Select the 3rd plate",
        selector : ":nth-child(3)",
        syntax: ":nth-child(A)",
        help : "Selects the <strong>nth</strong> (Ex: 1st, 3rd, 12th etc.) child element in another element.",
        examples : [
            '<strong>:nth-child(8)</strong> selects every element that is the 8th child of another element.',
            '<strong>div p:nth-child(2)</strong> selects the second <strong>p</strong> in every <strong>div</strong>',
        ],
        boardMarkup : `
    <plate/>
    <plate/>
    <plate/>
    <plate id="fancy"/>
    `
    },
    {
        selectorName: "Nth Last Child Selector",
        helpTitle: "Select an element by its order in another element, counting from the back",
        doThis : "Select the 1st tray",
        selector : "tray:nth-last-child(3)",
        syntax: ":nth-last-child(A)",
        help : "Selects the children from the bottom of the parent. This is like nth-child, but counting from the back!",
        examples : [
            '<strong>:nth-last-child(2)</strong> selects all second-to-last child elements.'
        ],
        boardMarkup: `
    <plate/>
    <tray/>
    <plate>
      <lemon/>
      <lemon/>
      <lemon/>
    </plate>
    <tray/>
    `
    },
    {
        selectorName: "First of Type Selector",
        helpTitle: "Select the first element of a specific type",
        doThis : "Select first tomato",
        selector : "tomato:first-of-type",
        syntax: ":first-of-type",
        help : "Selects the first element of that type within another element.",
        examples : [
            '<strong>span:first-of-type</strong> selects the first <tag>span</tag> in any element.'
        ],
        boardMarkup: `
    <lemon class="small"/>
    <tomato/>
    <tomato class="small"/>
    <tomato/>
    <tomato class="small"/>
    <plate>
      <lemon class="small"/>
      <lemon/>
    </plate>
    `
    },
    {
        selectorName: "Only of Type Selector",
        helpTitle: "Select elements that are the only ones of their type within of their parent element",
        selector : "tomato:only-of-type",
        syntax: ":only-of-type",
        doThis : "Select the tomato on the middle plate",
        help : "Selects the only element of its type within another element.",
        examples : [
            '<strong>p span:only-of-type</strong> selects a <tag>span</tag> within any <tag>p</tag> if it is the only <tag>span</tag> in there.'
        ],
        boardMarkup: `
    <plate id="fancy">
      <tomato class="small" />
      <tomato />
    </plate>
    <plate>
      <tomato class="small" />
    </plate>
    <plate>
      <cucumber />
    </plate>
    `
    },
    {
        selectorName: "Last of Type Selector",
        helpTitle: "Select the last element of a specific type",
        doThis : "Select the last tomato and lemon",
        selector : ".small:last-of-type",
        syntax: ":last-of-type",
        help : "Selects each last element of that type within another element. Remember type refers the kind of tag, so <tag>p</tag> and <tag>span</tag> are different types. <br><br> I wonder if this is how the last dinosaur was selected before it went extinct.",
        examples : [
            '<strong>div:last-of-type</strong> selects the last <tag>div</tag> in every element.',
            '<strong>p span:last-of-type</strong> selects the last <tag>span</tag> in every <tag>p</tag>.'
        ],
        boardMarkup : `
    <lemon class="small"/>
    <lemon class="small" />
    <cucumber />
    <cucumber />
    <tomato class="small" />
    <tomato class="small" />
    `
    },
    {
        selectorName: "Empty Selector",
        helpTitle: "Select elements that don't have children",
        doThis : "Select the empty trays",
        selector : "tray:empty",
        syntax: ":empty",
        help : "Selects elements that don't have any other elements inside of them.",
        examples : [
            '<strong>div:empty</strong> selects all empty <tag>div</tag> elements.'
        ],
        boardMarkup:`
    <tray/>
    <tray>
      <cucumber class="small"/>
    </tray>
    <plate/>
    <tray/>`
    },
    {
        selectorName: "Negation Pseudo-class",
        helpTitle: "Select all elements that don't match the negation selector",
        doThis : "Select the big tomatos",
        selector : "tomato:not(.small)",
        syntax: ":not(X)",
        help : 'You can use this to select all elements that do not match selector <strong>"X"</strong>.',
        examples : [
            '<strong>:not(#fancy)</strong> selects all elements that do not have <strong>id="fancy"</strong>.',
            '<strong>div:not(:first-child)</strong> selects every <tag>div</tag> that is not a first child.',
            '<strong>:not(.big, .medium)</strong> selects all elements that do not have <strong>class="big"</strong> or <strong>class="medium"</strong>.'
        ],
        boardMarkup: `
    <plate id="fancy">
      <tomato class="small" />
    </plate>
    <plate>
      <tomato />
    </plate>
    <tomato />
    <plate>
      <lemon class="small" />
    </plate>
    <cucumber class="small" />
    `
    },
    {
        selectorName: "Attribute Selector",
        helpTitle: "Select all elements that have a specific attribute",
        doThis : "Select the items for someone",
        selector : "[for]",
        syntax: "[attribute]",
        help : 'Attributes appear inside the opening tag of an element, like this: <tag>span attribute="value"</tag>. An attribute does not always have a value, it can be blank!',
        examples : [
            '<strong>a[href]</strong> selects all <tag>a</tag> elements that have a <strong>href="anything"</strong> attribute.',
            '<strong>[type]</strong> selects all elements that have a <strong>type="anything"</strong>. attribute'
        ],
        boardMarkup:`
    <tray><tomato class="small"/></tray>
    <tomato for="Ethan"/>
    <plate for="Alice"><cucumber/></plate>
    <tray for="Clara"><lemon/></tray>
    <cucumber/>`
    },
    {
        selectorName: "Attribute Selector",
        helpTitle: "Select all elements that have a specific attribute",
        doThis : "Select the plates for someone",
        selector : "plate[for]",
        syntax: "A[attribute]",
        help : "Combine the attribute selector with another selector (like the tag name selector) by adding it to the end.",
        examples : [
            '<strong>[value]</strong> selects all elements that have a <strong>value="anything"</strong> attribute.',
            '<strong>a[href]</strong> selects all <tag>a</tag> elements that have a <strong>href="anything"</strong> attribute.',
            '<strong>input[disabled]</strong> selects all <tag>input</tag> elements with the <strong>disabled</strong> attribute'
        ],
        boardMarkup:`
    <plate for="Sarah"><cucumber/></plate>
    <plate for="Luke"><tomato/></plate>
    <plate/>
    <tray for="Steve"><lemon/></tray>
    `
    },
    {
        selectorName: "Attribute Value Selector",
        helpTitle: "Select all elements that have a specific attribute value",
        doThis : "Select Vitaly's meal",
        selector : "[for=Vitaly]",
        syntax: '[attribute="value"]',
        help : "Attribute selectors are case sensitive, each character must match exactly.",
        examples : [
            '<strong>input[type="checkbox"]</strong> selects all checkbox input elements.'
        ],
        boardMarkup:`
    <tomato for="Alexei" />
    <tray for="Albina"><tomato /></tray>
    <tray for="Vitaly"><lemon/></tray>
    <cucumber/>
    `
    },
    {
        selectorName: "Attribute Ends With Selector",
        helpTitle: "Select all elements with an attribute value that ends with specific characters",
        doThis : "Select the items for names that end with 'ato'",
        selector : '[for$="ato"]',
        syntax: '[attribute$="value"]',
        help : '',
        examples : [
            '<strong>img[src$=".jpg"]</strong> selects all images display a <strong>.jpg</strong> image.',
        ],
        boardMarkup:`
    <tomato class="small"/>
    <tray for="Hayato"><cucumber/></tray>
    <tomato for="Ryota"></tomato>
    <plate for="Minato"><lemon/></plate>
    <cucumber class="small"/>
    `
    },
    {
        selectorName: "Attribute Wildcard Selector",
        helpTitle: "Select all elements with an attribute value that contains specific characters anywhere",
        syntax: '[attribute*="value"]',
        doThis : "Select the meals for names that contain 'obb'",
        selector : '[for*="obb"]',
        help : 'A useful selector if you can identify a common pattern in things like <strong>class</strong>, <strong>href</strong> or <strong>src</strong> attributes.',
        examples : [
            '<strong>img[src*="/thumbnails/"]</strong> selects all image elements that show images from the "thumbnails" folder.',
            '<strong>[class*="heading"]</strong> selects all elements with "heading" in their class, like <strong>class="main-heading"</strong> and <strong>class="sub-heading"</strong>'
        ],
        boardMarkup:`
    <tray for="Robbie"><tomato /></tray>
    <tray for="Timmy"><cucumber /></tray>
    <tray for="Bobby"><lemon /></tray>
    `
    }
];
