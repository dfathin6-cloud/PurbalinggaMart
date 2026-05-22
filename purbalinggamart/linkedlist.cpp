#include <iostream>
using namespace std;

#define EMPTY_LIST NULL

typedef struct tnode *address;

struct tnode {
    int data;
    address next;
};

address first;
address last;
address current;

address alokasikan(int data) {
    address alamat_alokasibaru = new tnode;
    alamat_alokasibaru->data = data;
    alamat_alokasibaru->next = NULL;
    return alamat_alokasibaru;
}

void insertfirst(address p) {
    p->next = first;
    first = p;
}

void cetak(address p) {
    while (p != NULL) {
        cout << "datanya " << p->data << endl;
        p = p->next;
    }
}

int main() {
    first = NULL;
    
    current = alokasikan(10);
    insertfirst(current);

    current = alokasikan(12);
    insertfirst(current);

    current = alokasikan(15);
    insertfirst(current);

    cetak(first);
    
    return 0;
}