class JSon {
    send(data) {
        console.log("Gửi JSON:", JSON.stringify(data));
    }
}

class Xml {
    send(xmlData) {
        console.log("Gửi XML:", xmlData);
    }
}

class XmlToJsonAdapter {
    constructor(xmlService) {
        this.xmlService = xmlService;
    }

    // XML -> JSON
    xmlToJson(xml) {
        const obj = {};
        xml.replace(/<(\w+)>(.*?)<\/\1>/g, (_, key, value) => {
            obj[key] = value;
        });
        return obj;
    }

    // JSON -> XML
    jsonToXml(json) {
        let xml = "";
        for (let key in json) {
            xml += `<${key}>${json[key]}</${key}>`;
        }
        return xml;
    }

    // Dùng như JSON Service
    send(data, type = "json") {
        if (type === "xml") {
            const json = this.xmlToJson(data);
            console.log("Convert XML → JSON:", json);
        } else {
            const xml = this.jsonToXml(data);
            this.xmlService.send(xml);
        }
    }
}

const xml = new Xml();
const adapter = new XmlToJsonAdapter(xml);

adapter.send({
    name: "Hoang",
    age: 21
});

adapter.send("<name>Hoang</name><age>21</age>", "xml");