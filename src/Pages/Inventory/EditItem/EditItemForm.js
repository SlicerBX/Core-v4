import React from 'react';
import { Form, FormFeedback, FormGroup, FormText, Label, Input } from
  'reactstrap';

export default function EditItemForm(props) {
  return (
    <Form>
      <FormGroup>
        <Label>Item Name
          <FormText color="muted">
            Delete the item and re-add it to modify name
          </FormText>
          <div style={{'color' : 'rgb(73, 80, 88)'}}>{props.name}</div>
        </Label>
      </FormGroup>
      <FormGroup>
        <Label>Price
          <FormText color="muted">
            Cost Per Unit
          </FormText>
        </Label>
        <Input
          invalid={isNaN(props.price)}
          placeholder=""
          value={props.price}
          onChange={(e) => props.updateItemPrice(e.target.value)}
        />
        <FormFeedback invalid="true">
          Please enter a non-negative number!
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Stock
          <FormText color="muted">
            Number of Items Available
          </FormText>
        </Label>
        <Input
          invalid={isNaN(props.stock)}
          placeholder=""
          value={props.stock}
          onChange={(e) => props.updateItemStock(e.target.value)}
        />
        <FormFeedback invalid="true">
          Please enter a non-negative number!
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Category
          <FormText color="muted">
            Item Type
          </FormText>
        </Label>
        <Input
          placeholder=""
          value={props.category}
          onChange={(e) => props.updateItemCategory(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>
          Description
          <FormText>
            Item Explanation
          </FormText>
        </Label>
        <Input
          type="textarea"
          value={props.description}
          onChange={(e) => props.updateItemDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Picture
          <FormText color="muted">
            Enter valid picture URL or leave blank for default
          </FormText>
        </Label>
        <Input
          placeholder=""
          value={props.picture}
          onChange={(e) => props.updateItemPicture(e.target.value)}
        />
      </FormGroup>
    </Form>
  );
}
